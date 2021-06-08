package lti

type Claims struct {
	Context                  string
	ResourceLink             string
	ToolPlatform             string
	Ags                      string
	Mentor                   string
	Roles                    string
	Custom                   string
	Extension                string
	Lis                      string
	TargetLinkUri            string
	Lti11LegacyUserId        string
	DeepLinking              string
	DeepLinkingData          string
	DeepLinkingToolMsg       string
	DeepLinkingToolLog       string
	ContentItem              string
	NamesAndRoles            string
	ToolLaunchCaliperContext string
	ToolUseCaliperContext    string
	Caliper                  string
}

type Scopes struct {
	AgsLineItem   string
	AgsResult     string
	AgsScore      string
	NamesAndRoles string
	Caliper       string
	Student       string
	Instructor    string
	Learner       string
	Mentor        string
	MentorRole    string
}

type Contexts struct {
	Course  string
	Account string
}

type Roles struct {
	CanvasPublicLtiKeysUrl string
	CanvasOidcUrl          string
	CanvasAuthTokenUrl     string

	CanvasBetaPublicLtiKeysUrl string
	CanvasBetaAuthTokenUrl     string
	CanvasBetaOidcUrl          string

	CanvasSubmissionType string

	AdministratorSystemRole           string
	NoneSystemRole                    string
	AccountAdminSystemRole            string
	CreatorSystemRole                 string
	SysAdminSystemRole                string
	SysSupportSystemRole              string
	UserSystemRole                    string
	AdministratorInstitutionRole      string
	FacultyInstitutionRole            string
	GuestInstitutionRole              string
	NoneInstitutionRole               string
	OtherInstitutionRole              string
	StaffInstitutionRole              string
	StudentInstitutionRole            string
	AlumniInstitutionRole             string
	InstructorInstitutionRole         string
	LearnerInstitutionRole            string
	MemberInstitutionRole             string
	MentorInstitutionRole             string
	ObserverInstitutionRole           string
	ProspectiveStudentInstitutionRole string
	AdministratorContextRole          string
	ContentDeveloperContextRole       string
	InstructorContextRole             string
	LearnerContextRole                string
	MentorContextRole                 string
	ManagerContextRole                string
	MemberContextRole                 string
	OfficerContextRole                string
}

type LtiDefinitions struct {
	LtiVersion         string
	LaunchPresentation string
	DeploymentId       string
	MessageType        string

	Claims   Claims
	Scopes   Scopes
	Contexts Contexts
	Roles    Roles
}

var Definitions LtiDefinitions = LtiDefinitions{
	LtiVersion:         "https://purl.imsglobal.org/spec/lti/claim/version",
	LaunchPresentation: "https://purl.imsglobal.org/spec/lti/claim/launch_presentation",
	DeploymentId:       "https://purl.imsglobal.org/spec/lti/claim/deployment_id",
	MessageType:        "https://purl.imsglobal.org/spec/lti/claim/message_type",

	Claims: Claims{
		Context:                  "https://purl.imsglobal.org/spec/lti/claim/context",
		ResourceLink:             "https://purl.imsglobal.org/spec/lti/claim/resource_link",
		ToolPlatform:             "https://purl.imsglobal.org/spec/lti/claim/tool_platform",
		Ags:                      "https://purl.imsglobal.org/spec/lti-ags/claim/endpoint",
		Mentor:                   "https://purl.imsglobal.org/spec/lti/claim/role_scope_mentor",
		Roles:                    "https://purl.imsglobal.org/spec/lti/claim/roles",
		Custom:                   "https://purl.imsglobal.org/spec/lti/claim/custom",
		Extension:                "http://www.ExamplePlatformVendor.com/session",
		Lis:                      "https://purl.imsglobal.org/spec/lti/claim/lis",
		TargetLinkUri:            "https://purl.imsglobal.org/spec/lti/claim/target_link_uri",
		Lti11LegacyUserId:        "https://purl.imsglobal.org/spec/lti/claim/lti11_legacy_user_id",
		DeepLinking:              "https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings",
		DeepLinkingData:          "https://purl.imsglobal.org/spec/lti-dl/claim/data",
		DeepLinkingToolMsg:       "https://purl.imsglobal.org/spec/lti-dl/claim/msg",
		DeepLinkingToolLog:       "https://purl.imsglobal.org/spec/lti-dl/claim/log",
		ContentItem:              "https://purl.imsglobal.org/spec/lti-dl/claim/content_items",
		NamesAndRoles:            "https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice",
		Caliper:                  "https://purl.imsglobal.org/spec/lti-ces/claim/caliper-endpoint-service",
		ToolLaunchCaliperContext: "http://purl.imsglobal.org/ctx/caliper/v1p1/ToolLaunchProfile-extension",
		ToolUseCaliperContext:    "http://purl.imsglobal.org/ctx/caliper/v1p1",
	},

	Scopes: Scopes{
		AgsLineItem:   "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",
		AgsResult:     "https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly",
		AgsScore:      "https://purl.imsglobal.org/spec/lti-ags/scope/score",
		NamesAndRoles: "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",
		Caliper:       "https://purl.imsglobal.org/spec/lti-ces/v1p0/scope/send",

		Student:    "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Student",
		Instructor: "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Instructor",
		Learner:    "http://purl.imsglobal.org/vocab/lis/v2/membership#Learner",
		Mentor:     "http://purl.imsglobal.org/vocab/lis/v2/membership#Mentor",
		MentorRole: "a62c52c02ba262003f5e",
	},

	Contexts: Contexts{
		Course:  "http://purl.imsglobal.org/vocab/lis/v2/course#courseoffering",
		Account: "Account",
	},

	Roles: Roles{
		AdministratorSystemRole:           "http://purl.imsglobal.org/vocab/lis/v2/system/person#Administrator",
		NoneSystemRole:                    "http://purl.imsglobal.org/vocab/lis/v2/system/person#None",
		AccountAdminSystemRole:            "http://purl.imsglobal.org/vocab/lis/v2/system/person#AccountAdmin",
		CreatorSystemRole:                 "http://purl.imsglobal.org/vocab/lis/v2/system/person#Creator",
		SysAdminSystemRole:                "http://purl.imsglobal.org/vocab/lis/v2/system/person#SysAdmin",
		SysSupportSystemRole:              "http://purl.imsglobal.org/vocab/lis/v2/system/person#SysSupport",
		UserSystemRole:                    "http://purl.imsglobal.org/vocab/lis/v2/system/person#User",
		AdministratorInstitutionRole:      "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Administrator",
		FacultyInstitutionRole:            "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Faculty",
		GuestInstitutionRole:              "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Guest",
		NoneInstitutionRole:               "http://purl.imsglobal.org/vocab/lis/v2/institution/person#None",
		OtherInstitutionRole:              "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Other",
		StaffInstitutionRole:              "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Staff",
		StudentInstitutionRole:            "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Student",
		AlumniInstitutionRole:             "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Alumni",
		InstructorInstitutionRole:         "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Instructor",
		LearnerInstitutionRole:            "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Learner",
		MemberInstitutionRole:             "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Member",
		MentorInstitutionRole:             "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Mentor",
		ObserverInstitutionRole:           "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Observer",
		ProspectiveStudentInstitutionRole: "http://purl.imsglobal.org/vocab/lis/v2/institution/person#ProspectiveStudent",
		AdministratorContextRole:          "http://purl.imsglobal.org/vocab/lis/v2/membership#Administrator",
		ContentDeveloperContextRole:       "http://purl.imsglobal.org/vocab/lis/v2/membership#ContentDeveloper",
		InstructorContextRole:             "http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor",
		LearnerContextRole:                "http://purl.imsglobal.org/vocab/lis/v2/membership#Learner",
		MentorContextRole:                 "http://purl.imsglobal.org/vocab/lis/v2/membership#Mentor",
		ManagerContextRole:                "http://purl.imsglobal.org/vocab/lis/v2/membership#Manager",
		MemberContextRole:                 "http://purl.imsglobal.org/vocab/lis/v2/membership#Member",
		OfficerContextRole:                "http://purl.imsglobal.org/vocab/lis/v2/membership#Officer",
	},
}
