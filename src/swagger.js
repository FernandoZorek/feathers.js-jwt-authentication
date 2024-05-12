
module.exports = async function (app) {
  function types(val) {
    if (val === 'INTEGER' || val === 'BOOLEAN' || val === 'TINYINT' || val === 'FLOAT' || val === 'DOUBLE') {
      return { type: 'integer' }
    } else if (val === 'DATE') {
      return { type: 'string', format: 'date' }
    } else if (val === 'DATETIME') {
      return { type: 'string', format: 'date-time' }
    } else if (val === 'BLOB' || val === 'TINYBLOB' || val === 'MEDIUMBLOB' || val === 'LONGBLOB') {
      return { type: 'integer', format: 'byte' }
    } else if (val === 'JSON') {
      return { type: 'object' }
    } else {
      return { type: 'string' }
    }
  }
  const authenticationResponse = {
    accessToken:  { type: 'string' },
    authentication: {
      type: 'object',
      properties: {
        strategy: {
          type: 'string'
        },
        accessToken: {
          type: 'string'
        },
        payload: {
          type: 'object'
        }
      }
    },
    user: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      }
    }
  }

  const docs = app.docs.paths;
  try {
    for (const patch in docs) {
      const schemasObj = {}
      let service = String(patch).split('/')[1];
      if (service === 'authentication') {
        schemasObj.email =  { type: 'string' }
        schemasObj.password = { type: 'string', format: 'password' }
      } else {
        const schemas = app.service(service).options.Model.getAttributes();
        for (const schema in schemas) {
          schemasObj[schema] = types(String(schemas[schema].type))
        }
      }
        for (const method in docs[patch]) {
          docs[patch][method].tag = 'user';
          for (const parameters of docs[patch][method].parameters) {
            if (parameters.schema['$ref']) parameters.schema = { type: 'object' };
          }
            if (docs[patch][method]?.requestBody?.content['application/json'].schema['$ref']) {
              const requestBody = JSON.parse(JSON.stringify(schemasObj))
              delete requestBody.id
              delete requestBody.createdAt
              delete requestBody.updatedAt
              docs[patch][method].requestBody.content['application/json'].schema = { type: 'object', properties: requestBody };
            }
          for (const code in docs[patch][method].responses) {
            if (code === '200' || code === '201') {
              if (method === 'get' || method === 'find') {
                docs[patch][method].responses[code].content = {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { type: 'object', properties: schemasObj }
                    }
                  }
                };
              } else if (method === 'delete') {
                docs[patch][method].responses[code].content = {
                  'application/json': {
                    schema: {
                      type: 'object'
                    }
                  }
                };
              } else if (method === 'post') {
                const properties = (service === 'authentication') ? authenticationResponse : schemasObj
                docs[patch][method].responses[code].content = {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: properties
                    }
                  }
                };
              } else {
                docs[patch][method].responses[code].content = {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: schemasObj
                    }
                  }
                };
              }
            }
          }
        }
      }
  } catch (e) {
    console.log(e)
  }
}
