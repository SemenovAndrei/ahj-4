import FormMain from './FormMain';
import PicsContainer from './PicsContainer';
import Gallery from './Gallery';

const form = new FormMain();

const picsContainer = new PicsContainer();

const gallery = new Gallery(form, picsContainer);
gallery.init();
