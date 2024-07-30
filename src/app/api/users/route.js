
import { signUpAction } from '../../../store/action';
import { getToken } from '../../../utils/token';

const allowedOrigins = [
'http://localhost:3000',
'http://localhost:8000',
];

const corsOptions = {
origin: (origin, callback) => {
if (allowedOrigins.includes(origin) || !origin) {
callback(null, true);
} else {
callback(new Error('Not allowed by CORS'));
}
},
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
credentials: true,
};

export const POST = async (req, res) => {
    try {
        const {email, name, password} = req.body;
        const response = await signUpAction(email, name, password);
        if (response.status === 201 || response.status === 200) {
            getToken();
            return res.status(200).json({
                message: 'OK',
                });
        } else {
            return res.status(response.status).json(response.data)
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({message: 'Error during registration'});
    }
    }
