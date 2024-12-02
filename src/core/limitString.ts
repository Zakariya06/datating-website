export function limitString(string: string | undefined, charLimit: number) {
  return string ? (string.length > charLimit ? `${string.substr(0, charLimit)}...` : string) : '';
}

export default limitString;
