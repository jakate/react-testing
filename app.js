var jevents = new JEvents();
moment.locale("fi");

React.render(
  React.createElement(Todo, null),
  document.getElementById('todo')
);

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
