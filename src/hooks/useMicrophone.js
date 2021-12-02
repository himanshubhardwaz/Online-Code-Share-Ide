import { useState } from 'react';

const useMicrophone = () => {
    const [havePermission, setHavePermission] = useState(false);

    const allowPermission = async () => {
        try {
            const permission = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            setHavePermission(true);
            return true;
        }
        catch (error) {
            setHavePermission(false)
            alert(`${error.name}: ${error.message}`)
            return false;
        }
    }

    const revokePermission = () => {
        // const microphone = navigator?.permissions?.query({ name: 'microphone' })
        // navigator?.permissions?.remove(microphone)
        setHavePermission(false)
    }

    return { allowPermission, havePermission, revokePermission }
}

export default useMicrophone;