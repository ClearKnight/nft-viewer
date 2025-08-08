import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'wagmi/chains'
import { erc721Abi } from 'viem'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const contract = searchParams.get('contract')
  const tokenId = searchParams.get('tokenId')

  if (!contract || !tokenId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const tokenURI = await client.readContract({
      address: contract as `0x${string}`,
      abi: erc721Abi,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    })

    return NextResponse.json({ tokenURI })
  } catch (error) {
    console.error('Error fetching token URI:', error)
    return NextResponse.json({ error: 'Failed to fetch token URI' }, { status: 500 })
  }
} 