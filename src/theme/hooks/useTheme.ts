import Storage, {useMMKVStorage } from "@storage/index";
import { ThemeOptions } from "@theme";


const useTheme = () => useMMKVStorage<ThemeOptions>('Theme', Storage, 'System');
export default useTheme;
