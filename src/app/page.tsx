import { Header } from '../components/Header'
import { NFTViewer } from '../components/NFTViewer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NFTViewer />
    </div>
  )
}
