import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'wagmi/chains'

// Extended ERC721 ABI that includes tokenOfOwnerByIndex
const erc721ExtendedAbi = [
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'index', type: 'uint256' }
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const contract = searchParams.get('contract')
  const owner = searchParams.get('owner')
  const index = searchParams.get('index')

  if (!contract || !owner || index === null) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const tokenId = await client.readContract({
      address: contract as `0x${string}`,
      abi: erc721ExtendedAbi,
      functionName: 'tokenOfOwnerByIndex',
      args: [owner as `0x${string}`, BigInt(index)],
    })

    return NextResponse.json({ tokenId: tokenId.toString() })
  } catch (error) {
    console.error('Error fetching token of owner by index:', error)
    return NextResponse.json({ error: 'Failed to fetch token ID' }, { status: 500 })
  }
} 