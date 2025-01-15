export const getOrder = async({customerId}:{customerId:string})=>{
    try{
        const res = await fetch(`/api/customers/${customerId}`);
        const {result, message} = await res.json();
        return {result, message};
    }catch(error){
        return {error};
    }
}

export const addOrder = async({customerId}:{customerId:string})=>{
    try {
        const res = await fetch(`/api/customers/${customerId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        const {message, result, error} = await res.json();
        return {message, error, result};
    } catch (error) {
        return {error};
    }
}

export const addOrderData = async(customerId:string, orderId:string, key:string, data:any)=>{
    try {
        const res = await fetch(`/api/customers/${customerId}/${orderId}/${key}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const {message, result} = await res.json();
        return {message, result};
    } catch (error) {
        return {error};
    }
}

export const deleteOrder = async(customerId:string, orderId: string)=>{
    try {
        const res = await fetch(`/api/customers/${customerId}/${orderId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderId)
        });
        const {message, result, error} = await res.json();
        return {message, result, error};
    } catch (error) {
        return {error}
    }
}
