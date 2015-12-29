module.exports =  {
  'options' : {
    'connections' : {
      'routes' :   {
        'cors' : {
          'origin' : ['http://localhost:8000'],
          'headers' : ['Content-Type'],
          credentials: true
        }    
      }
    }   
  },
  'app' : {
    'port' : 3000  
  }

};