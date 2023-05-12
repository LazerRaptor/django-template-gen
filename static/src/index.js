import h from '../lib/vhtml';
import Homepage from './pages/homepage';

globalThis.h = h;

const app = App();

app.add('homepage', Homepage)
app.start()

export default App;
