import h from '../lib/vhtml';
import App from './app';
import Homepage from './pages/homepage';
import About from './pages/about';

globalThis.h = h;

const app = App();

app.add('homepage', Homepage);
app.add('about', About);
app.start();
