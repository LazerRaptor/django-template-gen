import h from '../lib/vhtml';
import Homepage from './pages/homepage';
import App from '../lib/app';

globalThis.h = h;

const app = App();

app.add('homepage', Homepage)
app.start()

export default App;
