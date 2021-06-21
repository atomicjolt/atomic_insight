package lti

type IdToken struct {
	claims map[string]interface{}
}

func NewIdToken(claims map[string]interface{}) IdToken {
	return IdToken{
		claims: claims,
	}
}

func (t IdToken) mapAtKey(key Definition) map[string]interface{} {
	return t.claims[string(key)].(map[string]interface{})
}

func (t IdToken) ContextId() string {
	return t.mapAtKey(Definitions.Claims.Context)["id"].(string)
}
