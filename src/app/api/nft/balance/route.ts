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
  const owner = searchParams.get('owner')

  if (!contract || !owner) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const balance = await client.readContract({
      address: contract as `0x${string}`,
      abi: erc721Abi,
      functionName: 'balanceOf',
      args: [owner as `0x${string}`],
    })

    return NextResponse.json({ balance: balance.toString() })
  } catch (error) {
    console.error('Error fetching balance:', error)
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 })
  }
}