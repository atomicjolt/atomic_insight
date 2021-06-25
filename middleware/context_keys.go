package middleware

//See docs for context.WithValue
type contextKey int

const (
	eventsContextKey contextKey = iota
	oidcStateKey
	launchTokenKey
	resourcesKey
)
