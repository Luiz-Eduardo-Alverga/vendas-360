export interface UserData {
  tenantId: string
  tenantName: string
  tenantLogoPath: string
  companyId: string
  companyName: string
  companyLegalName: string
  companyRegistrationNumber: string
}

export function getUserData(): UserData[] {
  const userDataString = localStorage.getItem('userCompanies')

  if (!userDataString) {
    return []
  }

  try {
    const userData: UserData[] = JSON.parse(userDataString)
    return userData
  } catch (error) {
    console.error('Erro ao parsear os dados das empresas:', error)
    return []
  }
}
