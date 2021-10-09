const express = require('express');
const exphbs  = require('express-handlebars');

const controller = require('./controllers')

const app = express();
const hbs = exphbs.create({
  helpers: {
    formatSalary: function(salary) { 
      if(!salary) {
        return;
      }

      return new Intl.NumberFormat(
        'en-US',
        { 
          style: 'currency', 
          currency: 'USD', 
          minimumFractionDigits: 0 
        }
      )
      .format(salary) 
    }
  }
})

app.set('port', 3000);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/**
 * Routes
 */
app.get('/', controller.home);
app.get('/players', controller.players);
app.get('/free-agents', controller.free_agents);
app.get('/waivers', controller.waivers);
app.get('/min-salary', controller.min_salary);
app.get('/one-way', controller.one_way);


/**
 * Start Express server.
 */
 app.listen(app.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });