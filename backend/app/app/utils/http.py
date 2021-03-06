import aiohttp

_session = None


async def get_session():
    global _session
    if _session is None:
        _session = aiohttp.ClientSession()
    return _session


async def close_session():
    global _session
    if _session:
        await _session.close()
