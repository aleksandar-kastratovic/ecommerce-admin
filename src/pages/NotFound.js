import { toast } from 'react-toastify';

const NotFound = (params) => {
    const notify = () =>toast.info("Success Notification !", {});
    return (
        <>
        <p>NotFound</p>
        <button onClick={notify}>Notify !</button>
        </>
    );
}

export default NotFound;