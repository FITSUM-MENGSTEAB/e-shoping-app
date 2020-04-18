
/** 
 * Error handling  Controllers communicates with routers 
 * Functions used each routers in system error operations 
 * By Avater Group @march , 18, 2020
 */

 // page not found message 
exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: ''
  });
};

// access denied message 
exports.get403 = (req, res, next) => {
  res.status(403).render('403', {
    pageTitle: 'Access denied ',
    path: ''
  });
};
