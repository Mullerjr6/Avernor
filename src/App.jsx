import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Skeleton from './components/Skeleton'
import { lazyWithRecovery } from './utils/lazyWithRecovery'

const HomePage = lazyWithRecovery(() => import('./pages/HomePage'))
const CollectionPage = lazyWithRecovery(() => import('./pages/CollectionPage'))
const EntityDetailPage = lazyWithRecovery(() => import('./pages/EntityDetailPage'))
const ChronologyPage = lazyWithRecovery(() => import('./pages/ChronologyPage'))
const AtlasPage = lazyWithRecovery(() => import('./pages/AtlasPage'))
const GalleryPage = lazyWithRecovery(() => import('./pages/GalleryPage'))
const AboutPage = lazyWithRecovery(() => import('./pages/AboutPage'))
const NotFoundPage = lazyWithRecovery(() => import('./pages/NotFoundPage'))
const GenealogiesPage = lazyWithRecovery(() => import('./pages/GenealogiesPage'))
const GenealogyDetailPage = lazyWithRecovery(() => import('./pages/GenealogyDetailPage'))
const DynastiesPage = lazyWithRecovery(() => import('./pages/DynastiesPage'))
const SuccessionsPage = lazyWithRecovery(() => import('./pages/SuccessionsPage'))
const RelatedGenealogyPage = lazyWithRecovery(() => import('./pages/RelatedGenealogyPage'))
const SearchPage = lazyWithRecovery(() => import('./pages/SearchPage'))
const CharacterChatPage = lazyWithRecovery(() => import('./pages/CharacterChatPage'))

const catalogRoutes = [
  ['historia', 'historia'], ['reinos', 'reinos'], ['cidades', 'cidades'], ['casas', 'casas'],
  ['personagens', 'personagens'], ['bestiario', 'bestiario'], ['criaturas', 'criaturas'],
  ['guerras', 'guerras'], ['artefatos', 'artefatos'], ['lendas', 'lendas'], ['biblioteca', 'biblioteca'],
  ['povos', 'povos'], ['mitologia', 'mitologia'], ['religioes', 'religioes'], ['locais', 'locais'],
  ['cosmologia', 'cosmologia'], ['portais', 'portais'], ['outros-mundos', 'mundos'], ['retornados', 'retornados'],
  ['profecias', 'profecias'], ['fim-dos-tempos', 'fimDosTempos'], ['necromancia', 'necromancia'],
  ['reliquias', 'reliquias'], ['nar-khalion', 'narKhalion'], ['celestiais', 'celestiais'], ['lancas', 'lancas'], ['faccoes', 'faccoes'],
]

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Skeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cronologia" element={<ChronologyPage />} />
          <Route path="/atlas" element={<AtlasPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/busca" element={<SearchPage />} />
          <Route path="/genealogias" element={<GenealogiesPage />} />
          <Route path="/genealogias/:slug" element={<GenealogyDetailPage />} />
          <Route path="/dinastias" element={<DynastiesPage />} />
          <Route path="/dinastias/:slug" element={<DynastiesPage />} />
          <Route path="/sucessoes" element={<SuccessionsPage />} />
          <Route path="/sucessoes/:slug" element={<SuccessionsPage />} />
          <Route path="/reinos/:slug/sucessao" element={<SuccessionsPage realmMode />} />
          <Route path="/personagens/:slug/genealogia" element={<RelatedGenealogyPage subject="character" />} />
          <Route path="/personagens/:slug/conversar" element={<CharacterChatPage />} />
          <Route path="/casas/:slug/linhagem" element={<RelatedGenealogyPage subject="house" />} />
          {catalogRoutes.map(([path, catalogKey]) => (
            <Route key={path}>
              <Route path={`/${path}`} element={<CollectionPage catalogKey={catalogKey} />} />
              <Route path={`/${path}/:slug`} element={<EntityDetailPage catalogKey={catalogKey} />} />
            </Route>
          ))}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
