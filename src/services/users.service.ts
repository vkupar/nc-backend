import usersRepository from '../repositories/users.repository'

const createOrUpdate = async (
  userId: string | undefined,
  phoneNumber: string,
  payload: { name: string; email: string },
) => {
  if (!userId) {
    return await usersRepository.create(phoneNumber, payload)
  }
  return await usersRepository.update(userId, payload)
}

export default { createOrUpdate }
