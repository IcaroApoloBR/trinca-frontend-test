import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { email, password } = req.body

        if (email === 'trinca@teste.com' && password === 'trinca@teste') {
            return res.status(200).json({ user: { name: 'Tech Recruiter', email: 'trinca@teste.com' } })
        } else {
            return res.status(401).json({ error: 'Credenciais incorretas' })
        }
    }
    return res.status(405).end()
}