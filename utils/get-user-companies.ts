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
  if (typeof window === 'undefined') {
    // Se estiver no server-side (durante build ou SSR), retorna array vazio
    return []
  }

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
