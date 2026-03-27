/** Best-effort country/city from free-text location. */
export function inferCountryCity(location, explicitCountry, explicitCity) {
  const cityExplicit = explicitCity?.trim() || '';
  if (explicitCountry?.trim()) {
    return { country: explicitCountry.trim(), city: cityExplicit };
  }
  if (!location?.trim()) {
    return { country: '', city: cityExplicit };
  }
  const u = location.trim();
  const lower = u.toLowerCase();
  if (
    lower.includes('uae') ||
    lower.includes('dubai') ||
    lower.includes('abu dhabi') ||
    lower.includes('sharjah')
  ) {
    const parts = u.split(',').map((s) => s.trim()).filter(Boolean);
    return { country: 'UAE', city: parts[0] || cityExplicit };
  }
  if (lower.includes('india')) {
    const parts = u.split(',').map((s) => s.trim()).filter(Boolean);
    return { country: 'India', city: parts[0] || cityExplicit };
  }
  const parts = u.split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return { city: parts[0] || cityExplicit, country: parts[parts.length - 1] };
  }
  return { city: cityExplicit, country: u };
}
