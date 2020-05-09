
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Top Ten Doctors API",
      "description": "Top Ten Doctors API Information",
      "contact": {
        "name": "Backend Developer"
      },
      "servers": [
        "http://localhost:5000"
      ]
    },
    "paths": {
      "/client/token": {
        "post": {
          "summary": "Use to refresh client token",
          "tags": [
            "Clients"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RefreshToken"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "A client login response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RefreshTokenResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/client/oauth/{token}/{provider}": {
        "post": {
          "summary": "Use to client signup via oauth",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "token",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "access token from Oauth provider"
            },
            {
              "in": "path",
              "name": "provider",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "type of Oauth provider"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ClientSignup"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "client signup response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClientSignupResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/client/signup": {
        "post": {
          "summary": "Use to client signup",
          "tags": [
            "Clients"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ClientSignup"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "client signup response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClientSignupResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/client/login": {
        "post": {
          "summary": "Use to client login",
          "tags": [
            "Clients"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Login"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "client login response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClientLoginResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/client/forget-password": {
        "post": {
          "summary": "Use to client forget-password",
          "tags": [
            "Clients"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ForgetPassword"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ForgetPasswordResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/client/reset-password": {
        "post": {
          "summary": "Use to client reset-password",
          "tags": [
            "Clients"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResetPassword"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResetPasswordResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/client/search/{skip}": {
        "post": {
          "summary": "Use to list or search client",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ClientSignup"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "client search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClientSignup"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/update/{id}": {
        "put": {
          "summary": "Use to update client by id",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "client id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ClientSignup"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClientUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/add-favourite/{id}": {
        "put": {
          "summary": "Use to add favourite doctor for client",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "client id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Favourite"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/FavouriteAddResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/remove-favourite/{id}": {
        "put": {
          "summary": "Use to remove favourite doctor for client",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "client id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Favourite"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/FavouriteRemoveResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/get/{id}": {
        "put": {
          "summary": "Use to get client by id",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "client id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClientSignup"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/delete/{id}": {
        "put": {
          "summary": "Use to delete client by id",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "client id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClientDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/contact-us/add/": {
        "post": {
          "summary": "Use to add contact-us for client",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContactUs"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ContactUsResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/contact-us/search/{skip}": {
        "post": {
          "summary": "Use to list/ search contact-us",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContactUs"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ContactUs"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/contact-us/update/{id}": {
        "put": {
          "summary": "Use to update contact-us by id",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "contact-us id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContactUs"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ContactUsUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/contact-us/delete/{id}": {
        "put": {
          "summary": "Use to delete contact-us by id",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "contact-us id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ContactUsDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/confirmation/{id}": {
        "put": {
          "summary": "Use confirmation client email",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "client id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserConfirmResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/device/add/": {
        "post": {
          "summary": "Use to add device for client",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContactUs"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "client response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ContactUsResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/device/search/{skip}": {
        "post": {
          "summary": "Use to list/ search device",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Device"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "device response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Device"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/device/update/{id}": {
        "put": {
          "summary": "Use to update device by id",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "device id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Device"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "device response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DeviceUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/client/device/delete/{id}": {
        "put": {
          "summary": "Use to delete device by id",
          "tags": [
            "Clients"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "device id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "device response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DeviceDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/about/update/{id}": {
        "put": {
          "summary": "Use to update about by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "about id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/About"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "about response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AboutUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/about/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable about by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "about id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "about response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AboutDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/country/update/{id}": {
        "put": {
          "summary": "Use to update country by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "country id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Country"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "about response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CountryUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/country/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable country by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "country id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "country response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CountryDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/city/add": {
        "post": {
          "summary": "Use to add city",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/City"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CityResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/city/search/{skip}": {
        "post": {
          "summary": "Use to list or search city",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/City"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "city search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/City"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/city/update/{id}": {
        "put": {
          "summary": "Use to update city by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "city id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/City"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "city response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CityUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/city/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable city by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "city id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "city response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CityDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/contact/add": {
        "post": {
          "summary": "Use to add contact",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Contact"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ContactResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/contact/search/{skip}": {
        "post": {
          "summary": "Use to list or search contact",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Contact"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "contact search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Contact"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/contact/update/{id}": {
        "put": {
          "summary": "Use to update contact by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "contact id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Contact"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "contact response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ContactUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/contact/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable contact by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "contact id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "contact response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ContactDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/day/add": {
        "post": {
          "summary": "Use to add day",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WeekDay"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/WeekDayResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/day/search/{skip}": {
        "post": {
          "summary": "Use to list or search weekday",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WeekDay"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "weekday search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/WeekDay"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/day/update/{id}": {
        "put": {
          "summary": "Use to update week day by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "week day id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WeekDay"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "week day response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DayUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/day/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable day by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "day id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "day response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DayDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/region/add": {
        "post": {
          "summary": "Use to add region",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Region"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RegionResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/region/search/{skip}": {
        "post": {
          "summary": "Use to list or search region",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Region"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "region search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Region"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/region/update/{id}": {
        "put": {
          "summary": "Use to update region by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "region id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Region"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "region response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RegionUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/region/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable region by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "region id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "region response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RegionDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/category/update/{id}": {
        "put": {
          "summary": "Use to update category by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "category id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Category"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "category response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CategoryUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/category/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable category by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "category id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "category response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CategoryDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/setting/add": {
        "post": {
          "summary": "Use to add setting",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Setting"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SettingResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/setting/search/{skip}": {
        "post": {
          "summary": "Use to list or search setting",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Setting"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "setting search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Setting"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/setting/update/{id}": {
        "put": {
          "summary": "Use to update setting by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "setting id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Setting"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "setting response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SettingUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/setting/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable setting by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "setting id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "setting response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SettingDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/template/add": {
        "post": {
          "summary": "Use to add template message",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TemplateMessages"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TemplateMessagesResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/template/search/{skip}": {
        "post": {
          "summary": "Use to list or search template message",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TemplateMessages"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "template message search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TemplateMessages"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/template/update/{id}": {
        "put": {
          "summary": "Use to update template message by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "template message id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TemplateMessages"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "template message response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TemplateUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/template/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable template by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "template id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "template response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TemplateDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/web-view/add": {
        "post": {
          "summary": "Use to add web-view",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WebView"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/WebViewResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/web-view/search/{skip}": {
        "post": {
          "summary": "Use to list or search web-view",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WebView"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "web-view search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/WebView"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/web-view/update/{id}": {
        "put": {
          "summary": "Use to update web-view by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "web-view id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WebView"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "web-view response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/WebViewUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/web-view/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable web-view by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "web-view id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "web-view response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/WebViewDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/notification/add": {
        "post": {
          "summary": "Use to add notification",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Notification"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/notification/search/{skip}": {
        "post": {
          "summary": "Use to list or search notification",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Notification"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "notification search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Notification"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/notification/update/{id}": {
        "put": {
          "summary": "Use to update notification by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "notification id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Notification"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "notification response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/common/notification/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable notification by id",
          "tags": [
            "Common"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "notification id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "notification response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/doctor/token": {
        "post": {
          "summary": "Use to refresh doctor token",
          "tags": [
            "Doctors"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RefreshToken"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "A doctor login response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RefreshTokenResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/doctor/oauth/{token}/{provider}": {
        "post": {
          "summary": "Use to doctor signup via oauth",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "token",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "access token from Oauth provider"
            },
            {
              "in": "path",
              "name": "provider",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "type of Oauth provider"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DoctorSignup"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "doctor signup response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorSignupResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/doctor/signup": {
        "post": {
          "summary": "Use to doctor signup",
          "tags": [
            "Doctors"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DoctorSignup"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "doctor signup response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorSignupResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/doctor/login": {
        "post": {
          "summary": "Use to doctor login",
          "tags": [
            "Doctors"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Login"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "doctor login response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorLoginResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/doctor/search/{skip}": {
        "post": {
          "summary": "Use to list or search doctor",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DoctorSignup"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "doctor search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorSignup"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/update/{id}": {
        "put": {
          "summary": "Use to update doctor by id",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "doctor id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DoctorSignup"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "doctor response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/confirmation/{id}": {
        "put": {
          "summary": "Use confirmation doctor email",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "doctor id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "doctor response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserConfirmResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/doctor/get/{id}": {
        "post": {
          "summary": "Use to get doctor by id",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "doctor id"
            }
          ],
          "responses": {
            "200": {
              "description": "doctor search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorSignup"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/delete/{id}": {
        "put": {
          "summary": "Use to delete doctor by id",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "doctor id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "doctor response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/doctor/forget-password": {
        "post": {
          "summary": "Use to doctor forget-password",
          "tags": [
            "Doctors"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ForgetPassword"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "doctor response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ForgetPasswordResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/doctor/reset-password": {
        "post": {
          "summary": "Use to doctor reset-password",
          "tags": [
            "Doctors"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResetPassword"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "doctor response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResetPasswordResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/vacation": {
        "post": {
          "summary": "Use to doctor vacation",
          "tags": [
            "Doctors"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Vacation"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "vacation response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VacationResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/vacation/search/{skip}": {
        "post": {
          "summary": "Use to list or search doctor vacation",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Vacation"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "vacation search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Vacation"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/vacation/update/{id}": {
        "put": {
          "summary": "Use to update doctor vacation by id",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "vacation id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Vacation"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "doctor vacation response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VacationUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/vacation/delete/{id}": {
        "put": {
          "summary": "Use to delete doctor vacation by id",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "vacation id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "doctor vacation response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VacationDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/category/{id}": {
        "put": {
          "summary": "Use to add doctor category by id",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "doctor id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Category"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "doctor category response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CategoryResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/category-remove/{id}": {
        "put": {
          "summary": "Use to remove doctor category by id",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "doctor id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Category"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "doctor category response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CategoryDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/appointment": {
        "post": {
          "summary": "Use to doctor appointment",
          "tags": [
            "Doctors"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Appointment"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "appointment response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AppointmentResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/appointment/search/{skip}": {
        "post": {
          "summary": "Use to list or search doctor appointment",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Appointment"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "appointment search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Appointment"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/appointment/update/{id}": {
        "put": {
          "summary": "Use to update doctor appointment by id",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "appointment id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Appointment"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "doctor appointment response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AppointmentUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/appointment/delete/{id}": {
        "put": {
          "summary": "Use to delete doctor appointment by id",
          "tags": [
            "Doctors"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "appointment id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "doctor appointment response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AppointmentDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/hospital/add": {
        "post": {
          "summary": "Use to add hospital",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Hospital"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HospitalResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/hospital/search/{skip}": {
        "post": {
          "summary": "Use to list or search hospital",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Hospital"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "hospital search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Hospital"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/hospital/get/{id}": {
        "get": {
          "summary": "Use to get hospital by id",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "hospital id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "200": {
              "description": "hospital response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Hospital"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/hospital/update/{id}": {
        "put": {
          "summary": "Use to update hospital by id",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "hospital id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Hospital"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "hospital response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HospitalUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/hospital/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable hospital by id",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "hospital id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "hospital response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HospitalDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/insurance/{id}": {
        "put": {
          "summary": "Use to add insurance to hospital",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "insurance id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HospitalInsurance"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HospitalInsuranceResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/insurance-remove/{id}": {
        "put": {
          "summary": "Use to add insurance to hospital",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "insurance id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HospitalInsuranceRemove"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HospitalInsuranceRemoveResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor/{id}": {
        "put": {
          "summary": "Use to add doctor to hospital",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "doctor id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HospitalDoctor"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HospitalDoctorResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/doctor-remove/{id}": {
        "put": {
          "summary": "Use to remove doctor to hospital",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "doctor id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HospitalDoctorRemove"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HospitalDoctorRemoveResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/category/{id}": {
        "put": {
          "summary": "Use to add category to hospital",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "category id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HospitalCategory"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HospitalCategoryResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/category-remove/{id}": {
        "put": {
          "summary": "Use to remove category to hospital",
          "tags": [
            "Hospitals"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "category id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HospitalCategoryRemove"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HospitalCategoryRemoveResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/insurance/add": {
        "post": {
          "summary": "Use to add insurance company",
          "tags": [
            "InsuranceCompaney"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Insurance"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InsuranceResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/insurance/search/{skip}": {
        "post": {
          "summary": "Use to list or search insurance company",
          "tags": [
            "InsuranceCompaney"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Insurance"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "insurance company search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Insurance"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/insurance/get/{id}": {
        "get": {
          "summary": "Use to get insurance company by id",
          "tags": [
            "InsuranceCompaney"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "insurance company id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "200": {
              "description": "insurance company response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Insurance"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/insurance/update/{id}": {
        "put": {
          "summary": "Use to update insurance company by id",
          "tags": [
            "InsuranceCompaney"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "insurance company id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Insurance"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "insurance company response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InsuranceUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/insurance/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable insurance company by id",
          "tags": [
            "InsuranceCompaney"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "insurance company id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "insurance company response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InsuranceDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/add": {
        "post": {
          "summary": "Use to add offer",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Offer"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OfferResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/search/{skip}": {
        "post": {
          "summary": "Use to list or search offer",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Offer"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "permission search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Offer"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/get/{id}": {
        "get": {
          "summary": "Use to offer by id",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "offer id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "200": {
              "description": "permission response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Offer"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/update/{id}": {
        "put": {
          "summary": "Use to update offer",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "offer id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Offer"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "offer response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OfferUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable offer by id",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "offer id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "offer response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/OfferDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/reservation/id": {
        "post": {
          "summary": "Use to add offer reservation",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "reservation id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Reservation"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/reservation/search/{skip}": {
        "post": {
          "summary": "Use to list or search offer reservation",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Reservation"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "permission search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Reservation"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/reservation/update/{id}": {
        "put": {
          "summary": "Use to update offer reservation by id",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "offer id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Reservation"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "reservation response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/reservation/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable offer reservation by id",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "reservation id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "offer reservation response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/reservation/comment/add/{id}": {
        "post": {
          "summary": "Use to add offer reservation comment",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "reservation id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReservationComment"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationCommentResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/reservation/comment/search/{skip}": {
        "post": {
          "summary": "Use to list or search reservation comment",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReservationComment"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "permission search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationComment"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/reservation/comment/update/{id}": {
        "put": {
          "summary": "Use to update reservation comment by id",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "reservation id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReservationComment"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "reservation comment response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationCommentUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/reservation/comment/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable reservation comment by id",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "reservation comment id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "reservation comment response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationCommentDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/appointment/{id}": {
        "post": {
          "summary": "Use to add offer appointment",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "offer id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Appointment"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AppointmentResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/appointment/search/{skip}": {
        "post": {
          "summary": "Use to list or search offer appointment",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Appointment"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "permission search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Appointment"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/appointment/update/{id}": {
        "put": {
          "summary": "Use to update offer appointment by id",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "offer id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Appointment"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "offer appointment response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AppointmentUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/offer/appointment/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable appointment by id",
          "tags": [
            "Offer"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "appointment id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "appointment response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AppointmentDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/permission/add": {
        "post": {
          "summary": "Use to add permission",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Permission"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PermissionResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/permission/search/{skip}": {
        "post": {
          "summary": "Use to list or search permission",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Permission"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "permission search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Permission"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/permission/update/{id}": {
        "put": {
          "summary": "Use to update permission by id",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "permission id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Permission"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "permission response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PermissionUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/permission/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable permission by id",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "permission id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "permission response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PermissionDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/role/add": {
        "post": {
          "summary": "Use to add role",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Role"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RoleResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/role/search/{skip}": {
        "post": {
          "summary": "Use to list or search role",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Role"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "role search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Role"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/role/update/{id}": {
        "put": {
          "summary": "Use to update role by id",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "role id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Role"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "role response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RoleUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/role/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable role by id",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "role id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "role response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RoleDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/role/user/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable role user by id",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "role id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "role response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserRoleDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/role-access/add": {
        "post": {
          "summary": "Use to add role-access",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RoleAccess"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RoleAccessResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/role-access/search/{skip}": {
        "post": {
          "summary": "Use to list or search role access",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RoleAccess"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "role access search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RoleAccess"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/role-access/update/{id}": {
        "put": {
          "summary": "Use to update role-access by id",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "role-access id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RoleAccess"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "role-access response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RoleAccessUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/role-access/delete/{id}": {
        "put": {
          "summary": "Use to delete/ disable role-access by id",
          "tags": [
            "Permission"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "role-access id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "role-access response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RoleAccessDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/user/token": {
        "post": {
          "summary": "Use to refresh user token",
          "tags": [
            "Users"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RefreshToken"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "A user login response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RefreshTokenResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/user/oauth/{token}/{provider}": {
        "post": {
          "summary": "Use to user signup via oauth",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "token",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "access token from Oauth provider"
            },
            {
              "in": "path",
              "name": "provider",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "type of Oauth provider"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserSignup"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "user signup response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserSignupResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/user/signup": {
        "post": {
          "summary": "Use to user signup",
          "tags": [
            "Users"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserSignup"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "user signup response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserSignupResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/user/login": {
        "post": {
          "summary": "Use to user login",
          "tags": [
            "Users"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Login"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "user login response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserLoginResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/user/forget-password": {
        "post": {
          "summary": "Use to user forget-password",
          "tags": [
            "Users"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ForgetPassword"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "user response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ForgetPasswordResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/user/reset-password": {
        "post": {
          "summary": "Use to user reset-password",
          "tags": [
            "Users"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResetPassword"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "user response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResetPasswordResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/user/search/{skip}": {
        "post": {
          "summary": "Use to list or search user",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "skip",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "skip as offset"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserSearch"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "user search response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserSignup"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/user/update/{id}": {
        "put": {
          "summary": "Use update user",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "user id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserUpdate"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "user update response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserUpdateResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/user/confirmation/{id}": {
        "put": {
          "summary": "Use confirmation user email",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "user id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "user response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserConfirmResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/user/delete/{id}": {
        "put": {
          "summary": "Use delete/ disable user",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "user id"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "user response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserDeleteResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/logged/user/upload-image/{id}": {
        "put": {
          "summary": "Use to upload user image",
          "tags": [
            "Users"
          ],
          "consumes": [
            "multipart/form-data"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "user id"
            },
            {
              "in": "formData",
              "name": "image",
              "schema": {
                "type": "file"
              },
              "required": true,
              "description": "user image"
            },
            {
              "in": "header",
              "name": "Auth",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "Bearer Token"
            }
          ],
          "responses": {
            "201": {
              "description": "user response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserUpdateResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "ClientSignup": {
          "type": "object",
          "required": [
            "client_name",
            "client_password",
            "client_email",
            "client_phone",
            "gender",
            "birthday"
          ],
          "properties": {
            "client_name": {
              "type": "string"
            },
            "client_password": {
              "type": "string"
            },
            "client_email": {
              "type": "string"
            },
            "client_phone": {
              "type": "string"
            },
            "gender": {
              "type": "string"
            },
            "birthday": {
              "type": "string"
            }
          },
          "example": {
            "client_name": "abc xyz",
            "client_password": "dfgjk456",
            "client_email": "abc@example.com",
            "client_phone": 1234567980,
            "gender": "male",
            "birthday": "1990-04-08T00:00:00.000Z"
          }
        },
        "ClientSignupResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "signup succuss"
          }
        },
        "ClientLoginResponse": {
          "type": "object",
          "required": [
            "token",
            "refreshToken",
            "status",
            "message",
            "client"
          ],
          "properties": {
            "refreshToken": {
              "type": "string"
            },
            "token": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "client": {
              "type": "object"
            }
          },
          "example": {
            "token": "sdfdsfksdj...4gdf",
            "refreshToken": "sdfdsfksdj...4gdf",
            "status": true,
            "message": "login succuss",
            "client": {}
          }
        },
        "ClientUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "client updated"
          }
        },
        "ClientDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "client deleted"
          }
        },
        "Favourite": {
          "type": "object",
          "required": [
            "doctor_id"
          ],
          "properties": {
            "doctor_id": {
              "type": "string"
            }
          },
          "example": {
            "doctor_id": "dffdsf456dsf4ds5"
          }
        },
        "FavouriteAddResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "favourite doctor added"
          }
        },
        "FavouriteRemoveResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "favourite doctor removed"
          }
        },
        "ContactUs": {
          "type": "object",
          "required": [
            "title",
            "content",
            "client_id"
          ],
          "properties": {
            "title": {
              "type": "string"
            },
            "content": {
              "type": "string"
            },
            "client_id": {
              "type": "string"
            }
          },
          "example": {
            "title": "abc xyz",
            "content": "xyz",
            "client_id": "465sdfsd54dfsdc"
          }
        },
        "ContactUsResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "contact-us added"
          }
        },
        "ContactUsUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "contact-us updated"
          }
        },
        "ContactUsDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "contact-us deleted"
          }
        },
        "Device": {
          "type": "object",
          "required": [
            "title",
            "content",
            "client_id"
          ],
          "properties": {
            "title": {
              "type": "string"
            },
            "content": {
              "type": "string"
            },
            "client_id": {
              "type": "string"
            }
          },
          "example": {
            "title": "abc xyz",
            "content": "xyz",
            "client_id": "465sdfsd54dfsdc"
          }
        },
        "DeviceResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "device succuss"
          }
        },
        "DeviceUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "device updated"
          }
        },
        "DeviceDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "device deleted"
          }
        },
        "AboutUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "about updated"
          }
        },
        "AboutDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "about deleted"
          }
        },
        "CountryUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "country updated"
          }
        },
        "CountryDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "country deleted"
          }
        },
        "CityUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "city updated"
          }
        },
        "CityDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "city deleted"
          }
        },
        "ContactUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "contact updated"
          }
        },
        "ContactDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "contact deleted"
          }
        },
        "DayUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "day updated"
          }
        },
        "DayDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "day deleted"
          }
        },
        "RegionUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "region updated"
          }
        },
        "RegionDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "region deleted"
          }
        },
        "CategoryUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "category updated"
          }
        },
        "CategoryDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "category_id deleted"
          }
        },
        "SettingUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "setting updated"
          }
        },
        "SettingDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "setting deleted"
          }
        },
        "TemplateUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "template updated"
          }
        },
        "TemplateDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "template deleted"
          }
        },
        "WebViewUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "web-view updated"
          }
        },
        "WebViewDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "web-view deleted"
          }
        },
        "NotificationUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "notification updated"
          }
        },
        "NotificationDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "notification deleted"
          }
        },
        "City": {
          "type": "object",
          "required": [
            "country_id",
            "city_name_ar",
            "city_name_en"
          ],
          "properties": {
            "country_id": {
              "type": "string"
            },
            "city_name_ar": {
              "type": "string"
            },
            "city_name_en": {
              "type": "string"
            }
          },
          "example": {
            "country_id": "5ea676283ca1d30b6822d0c3",
            "city_name_ar": "abc xyz",
            "city_name_en": "5ea676283ca1d30b6822d0c3"
          }
        },
        "CityResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "city added"
          }
        },
        "Contact": {
          "type": "object",
          "required": [
            "about_us",
            "address_ar",
            "address_en",
            "phone",
            "mobile",
            "email",
            "instagram",
            "twitter",
            "facebook",
            "website"
          ],
          "properties": {
            "about_us": {
              "type": "string"
            },
            "address_ar": {
              "type": "string"
            },
            "address_en": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "mobile": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "instagram": {
              "type": "string"
            },
            "twitter": {
              "type": "string"
            },
            "facebook": {
              "type": "string"
            },
            "website": {
              "type": "string"
            }
          },
          "example": {
            "about_us": "abc",
            "address_ar": "abc",
            "address_en": "abc",
            "phone": 2345679852,
            "mobile": 2345679852,
            "email": "abc@example.com",
            "instagram": "link",
            "twitter": "link",
            "facebook": "link",
            "website": "link"
          }
        },
        "ContactResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "contact added"
          }
        },
        "WeekDay": {
          "type": "object",
          "required": [
            "day_name_ar",
            "day_name_en",
            "nikname"
          ],
          "properties": {
            "day_name_ar": {
              "type": "string"
            },
            "day_name_en": {
              "type": "string"
            },
            "nikname": {
              "type": "string"
            }
          },
          "example": {
            "day_name_ar": "abc xyz",
            "day_name_en": "abc xyz",
            "nikname": "abc"
          }
        },
        "WeekDayResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "week day added"
          }
        },
        "Region": {
          "type": "object",
          "required": [
            "city_id",
            "country_id",
            "region_name_ar",
            "region_name_en"
          ],
          "properties": {
            "city_id": {
              "type": "string"
            },
            "country_id": {
              "type": "string"
            },
            "region_name_ar": {
              "type": "string"
            },
            "region_name_en": {
              "type": "string"
            }
          },
          "example": {
            "city_id": "5ea676283ca1d30b6822d0c3",
            "country_id": "5ea676283ca1d30b6822d0c3",
            "region_name_ar": "abc",
            "region_name_en": "abc"
          }
        },
        "RegionResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "region added"
          }
        },
        "Setting": {
          "type": "object",
          "required": [
            "hospital_id",
            "accept_reservation",
            "cancel_reservation_period",
            "discount",
            "discount_percentage"
          ],
          "properties": {
            "hospital_id": {
              "type": "string"
            },
            "accept_reservation": {
              "type": "number"
            },
            "cancel_reservation_period": {
              "type": "number"
            },
            "discount": {
              "type": "number"
            },
            "discount_percentage": {
              "type": "number"
            }
          },
          "example": {
            "hospital_id": "5ea676283ca1d30b6822d0c3",
            "accept_reservation": 1,
            "cancel_reservation_period": 0,
            "discount": 10,
            "discount_percentage": 0
          }
        },
        "SettingResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "setting added"
          }
        },
        "WebView": {
          "type": "object",
          "required": [
            "link"
          ],
          "properties": {
            "link": {
              "type": "string"
            }
          },
          "example": {
            "link": "link"
          }
        },
        "WebViewResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "web-view added"
          }
        },
        "TemplateMessages": {
          "type": "object",
          "required": [
            "title",
            "subject_ar",
            "subject_en",
            "message_ar",
            "message_en",
            "sender"
          ],
          "properties": {
            "title": {
              "type": "string"
            },
            "subject_ar": {
              "type": "string"
            },
            "subject_en": {
              "type": "string"
            },
            "message_ar": {
              "type": "string"
            },
            "message_en": {
              "type": "string"
            },
            "sender": {
              "type": "string"
            }
          },
          "example": {
            "title": "abc xyz",
            "subject_ar": "abc xyz",
            "subject_en": "abc xyz",
            "message_ar": "abc xyz",
            "message_en": "abc xyz",
            "sender": "abc xyz"
          }
        },
        "TemplateMessagesResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "template messages added"
          }
        },
        "Notification": {
          "type": "object",
          "required": [
            "client_id",
            "doctor_id",
            "template_id",
            "message_ar",
            "message_en",
            "type",
            "status"
          ],
          "properties": {
            "client_id": {
              "type": "string"
            },
            "doctor_id": {
              "type": "string"
            },
            "template_id": {
              "type": "string"
            },
            "message_ar": {
              "type": "string"
            },
            "message_en": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "status": {
              "type": "number"
            }
          },
          "example": {
            "client_id": "5ea676283ca1d30b6822d0c3",
            "doctor_id": "5ea676283ca1d30b6822d0c3",
            "template_id": "5ea676283ca1d30b6822d0c3",
            "message_ar": "abc",
            "message_en": "abc",
            "type": "type",
            "status": 1
          }
        },
        "NotificationResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "notification added"
          }
        },
        "DoctorSignup": {
          "type": "object",
          "required": [
            "nickname",
            "doctor_name_ar",
            "doctor_name_en",
            "doctor_description_ar",
            "doctor_description_en",
            "specialist",
            "email",
            "password",
            "phone",
            "gender",
            "price",
            "waiting_period",
            "discount_copon"
          ],
          "properties": {
            "nickname": {
              "type": "string"
            },
            "doctor_name_ar": {
              "type": "string"
            },
            "doctor_name_en": {
              "type": "string"
            },
            "doctor_description_ar": {
              "type": "string"
            },
            "doctor_description_en": {
              "type": "string"
            },
            "specialist": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "gender": {
              "type": "number"
            },
            "price": {
              "type": "number"
            },
            "waiting_period": {
              "type": "number"
            },
            "discount_copon": {
              "type": "number"
            }
          },
          "example": {
            "nickname": "abc xyz",
            "doctor_name_ar": "dfgjk456",
            "doctor_name_en": "abc@example.com",
            "doctor_description_ar": 1234567980,
            "doctor_description_en": 1234567980,
            "specialist": 1234567980,
            "email": 1234567980,
            "password": 1234567980,
            "phone": 1234567980,
            "gender": 1234567980,
            "price": 1234567980,
            "waiting_period": 1234567980,
            "discount_copon": 1234567980
          }
        },
        "DoctorSignupResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "signup succuss"
          }
        },
        "DoctorLoginResponse": {
          "type": "object",
          "required": [
            "token",
            "refreshToken",
            "status",
            "message",
            "doctor"
          ],
          "properties": {
            "refreshToken": {
              "type": "string"
            },
            "token": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "doctor": {
              "type": "object"
            }
          },
          "example": {
            "token": "sdfdsfksdj...4gdf",
            "refreshToken": "sdfdsfksdj...4gdf",
            "status": true,
            "message": "login succuss",
            "doctor": {}
          }
        },
        "DoctorUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "doctor updated"
          }
        },
        "DoctorDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "doctor deleted"
          }
        },
        "Vacation": {
          "type": "object",
          "required": [
            "doctor_id",
            "start_date",
            "end_date",
            "period"
          ],
          "properties": {
            "doctor_id": {
              "type": "string"
            },
            "start_date": {
              "type": "date"
            },
            "end_date": {
              "type": "date"
            },
            "period": {
              "type": "number"
            }
          },
          "example": {
            "doctor_id": "abc xyz",
            "start_date": "2020-05-08T00:00:00.000Z",
            "end_date": "2020-05-10T00:00:00.000Z",
            "period": 1
          }
        },
        "VacationResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "vacation added"
          }
        },
        "VacationUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "vacation updated"
          }
        },
        "VacationDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "vacation deleted"
          }
        },
        "Category": {
          "type": "object",
          "required": [
            "category_id"
          ],
          "properties": {
            "category_id": {
              "type": "string"
            }
          },
          "example": {
            "category_id": "abcxyzfdsf45"
          }
        },
        "CategoryResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "category added"
          }
        },
        "Appointment": {
          "type": "object",
          "required": [
            "week_day_id",
            "period",
            "period_from",
            "period_to"
          ],
          "properties": {
            "week_day_id": {
              "type": "string"
            },
            "period": {
              "type": "number"
            },
            "period_from": {
              "type": "date"
            },
            "period_to": {
              "type": "date"
            }
          },
          "example": {
            "week_day_id": "5ea676283ca1d30b6822d0c3",
            "period": 1,
            "period_from": "2020-05-04T00:00:00.000Z",
            "period_to": "2020-05-08T00:00:00.000Z"
          }
        },
        "AppointmentResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "appointment added"
          }
        },
        "AppointmentUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "appointment updated"
          }
        },
        "AppointmentDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "appointment deleted"
          }
        },
        "Hospital": {
          "type": "object",
          "required": [
            "hospital_name_ar",
            "hospital_name_en",
            "address_ar",
            "address_en",
            "country_id",
            "city_id",
            "region_id",
            "longitude",
            "latitude"
          ],
          "properties": {
            "hospital_name_ar": {
              "type": "string"
            },
            "hospital_name_en": {
              "type": "string"
            },
            "address_ar": {
              "type": "string"
            },
            "address_en": {
              "type": "string"
            },
            "country_id": {
              "type": "string"
            },
            "city_id": {
              "type": "string"
            },
            "region_id": {
              "type": "string"
            },
            "longitude": {
              "type": "number"
            },
            "latitude": {
              "type": "number"
            }
          },
          "example": {
            "hospital_name_ar": "abc xyz",
            "hospital_name_en": "abc xyz",
            "address_ar": "xyz",
            "address_en": "xyz",
            "country_id": "5ea67ac810dc3412a5142a7c",
            "city_id": "5ea67ac810dc3412a5142a7c",
            "region_id": "5ea67ac810dc3412a5142a7c",
            "longitude": 45.5,
            "latitude": 35.8
          }
        },
        "HospitalResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "hospital added"
          }
        },
        "HospitalUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "hospital updated"
          }
        },
        "HospitalDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "hospital deleted"
          }
        },
        "HospitalInsurance": {
          "type": "object",
          "required": [
            "company_id"
          ],
          "properties": {
            "company_id": {
              "type": "string"
            }
          },
          "example": {
            "company_id": "sdjgklsd4654dgfgf"
          }
        },
        "HospitalInsuranceResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "insurance added"
          }
        },
        "HospitalInsuranceRemove": {
          "type": "object",
          "required": [
            "company_id"
          ],
          "properties": {
            "company_id": {
              "type": "string"
            }
          },
          "example": {
            "company_id": "sdjgklsd4654dgfgf"
          }
        },
        "HospitalInsuranceRemoveResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "insurance deleted"
          }
        },
        "HospitalDoctor": {
          "type": "object",
          "required": [
            "doctor_id"
          ],
          "properties": {
            "doctor_id": {
              "type": "string"
            }
          },
          "example": {
            "doctor_id": "sdjgklsd4654dgfgf"
          }
        },
        "HospitalDoctorResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "doctor added"
          }
        },
        "HospitalDoctorRemove": {
          "type": "object",
          "required": [
            "doctor_id"
          ],
          "properties": {
            "doctor_id": {
              "type": "string"
            }
          },
          "example": {
            "doctor_id": "sdjgklsd4654dgfgf"
          }
        },
        "HospitalDoctorRemoveResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "doctor deleted"
          }
        },
        "HospitalCategory": {
          "type": "object",
          "required": [
            "category_id"
          ],
          "properties": {
            "category_id": {
              "type": "string"
            }
          },
          "example": {
            "category_id": "sdjgklsd4654dgfgf"
          }
        },
        "HospitalCategoryResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "category added"
          }
        },
        "HospitalCategoryRemove": {
          "type": "object",
          "required": [
            "category_id"
          ],
          "properties": {
            "category_id": {
              "type": "string"
            }
          },
          "example": {
            "category_id": "sdjgklsd4654dgfgf"
          }
        },
        "HospitalCategoryRemoveResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "category deleted"
          }
        },
        "Insurance": {
          "type": "object",
          "required": [
            "company_name_en",
            "company_name_ar",
            "country_id"
          ],
          "properties": {
            "company_name_en": {
              "type": "string"
            },
            "company_name_ar": {
              "type": "string"
            },
            "country_id": {
              "type": "string"
            }
          },
          "example": {
            "company_name_en": "abc xyz",
            "company_name_ar": "abc xyz",
            "country_id": "5ea676283ca1d30b6822d0c3"
          }
        },
        "InsuranceResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "insurance company added"
          }
        },
        "InsuranceUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "insurance company updated"
          }
        },
        "InsuranceDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "insurance company deleted"
          }
        },
        "Offer": {
          "type": "object",
          "required": [
            "doctor_id",
            "category_id",
            "hospital_id",
            "title_ar",
            "title_en",
            "description_ar",
            "description_en",
            "discount_per",
            "price_after_disc",
            "price_before_disc",
            "views_num",
            "start_date",
            "end_date"
          ],
          "properties": {
            "doctor_id": {
              "type": "string"
            },
            "category_id": {
              "type": "string"
            },
            "hospital_id": {
              "type": "string"
            },
            "title_ar": {
              "type": "string"
            },
            "title_en": {
              "type": "string"
            },
            "description_ar": {
              "type": "string"
            },
            "description_en": {
              "type": "string"
            },
            "discount_per": {
              "type": "number"
            },
            "price_after_disc": {
              "type": "number"
            },
            "price_before_disc": {
              "type": "number"
            },
            "views_num": {
              "type": "number"
            },
            "start_date": {
              "type": "date"
            },
            "end_date": {
              "type": "date"
            }
          },
          "example": {
            "doctor_id": "5ea676283ca1d30b6822d0c3",
            "category_id": "5ea676283ca1d30b6822d0c3",
            "hospital_id": "5ea676283ca1d30b6822d0c3",
            "title_ar": "abc",
            "title_en": "abc",
            "description_ar": "abc",
            "description_en": "abc",
            "discount_per": 12,
            "price_after_disc": 30,
            "price_before_disc": 20,
            "views_num": 0,
            "start_date": "2020-05-01T00:00:00.000Z",
            "end_date": "2020-05-10T00:00:00.000Z"
          }
        },
        "OfferResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "offer added"
          }
        },
        "OfferUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "offer updated"
          }
        },
        "OfferDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "offer deleted"
          }
        },
        "Reservation": {
          "type": "object",
          "required": [
            "client_id",
            "reservation_time",
            "reservation_date",
            "status",
            "reason"
          ],
          "properties": {
            "client_id": {
              "type": "string"
            },
            "reservation_time": {
              "type": "string"
            },
            "reservation_date": {
              "type": "date"
            },
            "status": {
              "type": "number"
            },
            "reason": null
          },
          "example": {
            "client_id": "5ea676283ca1d30b6822d0c3",
            "reservation_time": "12:00 PM",
            "reservation_date": "2020-05-08",
            "status": 1,
            "reason": "abc"
          }
        },
        "ReservationResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "reservation added"
          }
        },
        "ReservationUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "reservation updated"
          }
        },
        "ReservationDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "reservation deleted"
          }
        },
        "ReservationComment": {
          "type": "object",
          "required": [
            "comment",
            "category_id",
            "rate_status"
          ],
          "properties": {
            "comment": {
              "type": "string"
            },
            "rate": {
              "type": "number"
            },
            "rate_status": {
              "type": "string"
            }
          },
          "example": {
            "comment": "abc",
            "rate": 5,
            "rate_status": 5
          }
        },
        "ReservationCommentResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "reservation comment added"
          }
        },
        "ReservationCommentUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "reservation comment updated"
          }
        },
        "ReservationCommentDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "reservation comment deleted"
          }
        },
        "Permission": {
          "type": "object",
          "required": [
            "name",
            "controller",
            "action",
            "status"
          ],
          "properties": {
            "name": {
              "type": "string"
            },
            "controller": {
              "type": "string"
            },
            "action": {
              "type": "string"
            },
            "status": {
              "type": "number"
            }
          },
          "example": {
            "name": "add permission",
            "controller": "permission",
            "action": "add",
            "status": 1
          }
        },
        "PermissionResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "permission added"
          }
        },
        "PermissionUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "permission updated"
          }
        },
        "PermissionDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "permission deleted"
          }
        },
        "Role": {
          "type": "object",
          "required": [
            "title",
            "alias",
            "is_fixed"
          ],
          "properties": {
            "title": {
              "type": "string"
            },
            "alias": {
              "type": "string"
            },
            "is_fixed": {
              "type": "boolean"
            }
          },
          "example": {
            "title": "abc xyz",
            "alias": "abc xyz",
            "is_fixed": false
          }
        },
        "RoleResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "role added"
          }
        },
        "RoleUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "role updated"
          }
        },
        "RoleDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "role deleted"
          }
        },
        "UserRoleDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "user deleted"
          }
        },
        "RoleAccess": {
          "type": "object",
          "required": [
            "role_id",
            "permission_id"
          ],
          "properties": {
            "role_id": {
              "type": "string"
            },
            "permission_id": {
              "type": "string"
            }
          },
          "example": {
            "role_id": "abc xyz",
            "permission_id": "abc xyz"
          }
        },
        "RoleAccessResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "role-access added"
          }
        },
        "RoleAccessUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "role-access updated"
          }
        },
        "RoleAccessDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "role-access deleted"
          }
        },
        "RefreshToken": {
          "type": "object",
          "required": [
            "refreshToken"
          ],
          "properties": {
            "refreshToken": {
              "type": "string"
            }
          },
          "example": {
            "refreshToken": "Bearer sdfdsfksdj...4gdf"
          }
        },
        "RefreshTokenResponse": {
          "type": "object",
          "required": [
            "token",
            "refreshToken"
          ],
          "properties": {
            "refreshToken": {
              "type": "string"
            },
            "token": {
              "type": "string"
            }
          },
          "example": {
            "token": "sdfdsfksdj...4gdf",
            "refreshToken": "sdfdsfksdj...4gdf"
          }
        },
        "UserSignup": {
          "type": "object",
          "required": [
            "user_name",
            "user_password",
            "user_email",
            "user_phone"
          ],
          "properties": {
            "user_name": {
              "type": "string"
            },
            "user_password": {
              "type": "string"
            },
            "user_email": {
              "type": "string"
            },
            "user_phone": {
              "type": "string"
            }
          },
          "example": {
            "user_name": "abc xyz",
            "user_password": "dfgjk456",
            "user_email": "abc@example.com",
            "user_phone": 1234567980
          }
        },
        "UserSignupResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "signup succuss"
          }
        },
        "Login": {
          "type": "object",
          "required": [
            "email",
            "password"
          ],
          "properties": {
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "example": {
            "email": "abc@example.com",
            "password": "dgd45gdfd"
          }
        },
        "UserLoginResponse": {
          "type": "object",
          "required": [
            "token",
            "refreshToken",
            "status",
            "message",
            "user"
          ],
          "properties": {
            "refreshToken": {
              "type": "string"
            },
            "token": {
              "type": "string"
            },
            "status": {
              "type": "boolean"
            },
            "user": {
              "type": "object"
            }
          },
          "example": {
            "token": "sdfdsfksdj...4gdf",
            "refreshToken": "sdfdsfksdj...4gdf",
            "status": true,
            "message": "login succuss",
            "user": {}
          }
        },
        "ForgetPassword": {
          "type": "object",
          "required": [
            "email"
          ],
          "properties": {
            "email": {
              "type": "string"
            }
          },
          "example": {
            "email": "abc@example.com"
          }
        },
        "ForgetPasswordResponse": {
          "type": "object",
          "required": [
            "status",
            "message",
            "token"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            },
            "token": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "reset link sent",
            "token": "sdfdsfksdj...4gdf"
          }
        },
        "ResetPassword": {
          "type": "object",
          "required": [
            "token",
            "password"
          ],
          "properties": {
            "token": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "example": {
            "token": "dfdf45",
            "password": "dfhdf45"
          }
        },
        "ResetPasswordResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            },
            "token": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "password changed"
          }
        },
        "UserSearch": {
          "type": "object",
          "properties": {
            "user_name": {
              "type": "string"
            },
            "user_email": {
              "type": "string"
            },
            "user_phone": {
              "type": "string"
            }
          },
          "example": {
            "user_name": "abc xyz",
            "user_email": "abc@example.com",
            "user_phone": 7897416582
          }
        },
        "UserUpdate": {
          "type": "object",
          "properties": {
            "user_name": {
              "type": "string"
            },
            "user_email": {
              "type": "string"
            },
            "user_phone": {
              "type": "string"
            }
          },
          "example": {
            "user_name": "abc xyz",
            "user_email": "abc@example.com",
            "user_phone": 7897416582
          }
        },
        "UserUpdateResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "user updated"
          }
        },
        "UserConfirmResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "user verified"
          }
        },
        "UserDeleteResponse": {
          "type": "object",
          "required": [
            "status",
            "message"
          ],
          "properties": {
            "status": {
              "type": "boolean"
            },
            "message": {
              "type": "string"
            }
          },
          "example": {
            "status": true,
            "message": "user deleted"
          }
        }
      }
    },
    "tags": []
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
