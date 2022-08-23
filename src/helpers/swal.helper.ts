import Swal from 'sweetalert2';
import withReactContent, { ReactSweetAlert } from 'sweetalert2-react-content';

export const swalert: typeof Swal & ReactSweetAlert= withReactContent(Swal);