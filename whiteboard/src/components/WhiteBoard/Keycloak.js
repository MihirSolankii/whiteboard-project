import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'whiteboard',
  clientId: 'whiteboard-app',
});

export default keycloak;
