module.exports =  {
  'options' : {
    'connections' : {
      'routes' :   {
        'cors' : {
          'origin' : ['http://localhost:8000'],
          'additionalHeaders' : [
            'access-control-allow-origin',
            'accept-encoding',
            'accept-Language',
            'access-control-request-method',
            'access-control-request-headers',
            'connection',
            'host',
            'origin',
            'referer',
            'user-agent'
          ]
        }    
      }
    }   
  },
  'app' : {
    'port' : 3000  
  }

};