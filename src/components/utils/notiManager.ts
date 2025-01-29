
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-bottom-right',
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
};

const notificationSuccess = (message: string) => {
    toastr.success(message);
};

const notificationInfo = (message: string) => {
    toastr.info(message);
};

export {
    notificationSuccess,
    notificationInfo
};
