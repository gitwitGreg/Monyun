export const fetchUserInfo = async(userId: string) => {

    try{

        console.log('id being send: ', userId)

        const response = await fetch('/api/signin',{

            method: 'POST',

            body: JSON.stringify(userId),

            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){

            const error = await response.json();

            throw new Error(error.error);

        }

        const userInfo = await response.json();

        return userInfo;

    }catch(error){

        throw new Error(error as string)

    }
    
}


export const signInUser = async(credentials: {email: string, password: string}) => {

    try{

        const response = await fetch('/api/signin', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json' 
            },

            body: JSON.stringify(credentials)
        })

        if(!response.ok){

            const error = await response.json();

            throw new Error(error.error)

        }

        const userId = await response.json();

        return userId;

    }catch(error){

    }

}