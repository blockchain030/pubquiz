const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'

export const asText = async (hash) => {
    return await (await fetch(IPFS_GATEWAY + hash)).text()
}

export const asJSON = async (hash) => {
    return await (await fetch(IPFS_GATEWAY + hash)).json()
}
