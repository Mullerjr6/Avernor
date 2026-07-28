import { Navigate, useParams } from 'react-router'
import { genealogies, genealogyPeople } from '../content/genealogies'
import GenealogyDetailPage from './GenealogyDetailPage'

export default function RelatedGenealogyPage({ subject }) {
  const { slug } = useParams()
  let tree
  if (subject === 'character') {
    const person = genealogyPeople.find((entry) => entry.profile?.endsWith(`/${slug}`))
    tree = person && genealogies.find((entry) => entry.memberIds.includes(person.id))
  } else {
    tree = genealogies.find((entry) => entry.id === slug || entry.house?.toLowerCase() === slug || entry.summary?.toLowerCase().includes(`casa ${slug}`))
    if (!tree && slug === 'arden') tree = genealogies.find((entry) => entry.id === 'valoria')
  }
  return tree ? <GenealogyDetailPage fixedTree={tree} /> : <Navigate to="/genealogias" replace />
}
