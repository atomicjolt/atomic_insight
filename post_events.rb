# This code mostly comes from config/initializers/live_events.rb

class CustomEventClient
  def self.put_records(records:, stream_name:)
    events = records.map do |e|
      data = JSON.parse(e[:data])
      data['metadata'] = data.delete('attributes')
      { type: data.dig('metadata', 'event_name'), payload: data.to_s }
    end
    send_events(events)

    OpenStruct.new(
      records: records.map { |r| OpenStruct.new(error_code: 'failure', error_message: 'this fails' ) }
    )
  end

  def self.stream_name
    'stubbed_kinesis_stream'
  end
end

def send_events(events)
  secret = 'shared_secret'
  claims = { events: events }

  jwt = JSON::JWT.new(claims).sign(secret, :HS256)

  uri = URI('http://192.168.33.1:8888/events')
  res = Net::HTTP.post_form(uri, 'events' => jwt.to_s)
end

Rails.configuration.to_prepare do
  LiveEvents.logger = Rails.logger
  LiveEvents.cache = Rails.cache
  LiveEvents.statsd = InstStatsd::Statsd
  LiveEvents.max_queue_size = -> { Setting.get('live_events_max_queue_size', 5000).to_i }
  LiveEvents.settings = -> {
    plugin_settings = Canvas::Plugin.find(:live_events)&.settings
    plugin_settings.merge('stub_kinesis' => true)
  }

  LiveEvents.stream_client = CustomEventClient

  # The following code throws NoMethodError exceptions.
  # Need to do research to see if it's safe to remove,
  # and why it works in the regular initializer.

=begin
  LiveEvents.aws_credentials = -> (settings) {
    if settings['vault_credential_path']
      Canvas::Vault::AwsCredentialProvider.new(settings['vault_credential_path'])
    else
      nil
    end
  }
  # sometimes this async worker thread grabs a connection on a Setting read or similar.
  # We need it to be released or the main thread can have a real problem.
  LiveEvents.on_work_unit_end = -> { ActiveRecord::Base.clear_active_connections! }
=end
end
