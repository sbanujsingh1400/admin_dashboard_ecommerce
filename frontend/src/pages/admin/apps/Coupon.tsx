import { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';


const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";


const Coupon = () => {
    const  [size, setSize] = useState<number>(8)
    const  [prefix, setPrefix] = useState<string>('');
    const  [includeNumbers, setIncludeNumbers] = useState<boolean>(false)
    const  [includeCharacters, setIncludeCharacters] = useState<boolean>(false)
    const  [includeSymbols, setIncludeSymbols] = useState<boolean>(false)
    const  [isCopied, setIsCopied] = useState<boolean>(false)
    const  [coupon, setCoupon] = useState<string>('')

    const copyText = async (coupon: string) => {
        await window.navigator.clipboard.writeText(coupon);
        setIsCopied(true);
      };
    
      const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!includeNumbers && !includeCharacters && !includeSymbols)
          return alert("Please Select One At Least");
    
        let result: string = prefix || "";
        const loopLength: number = size - result.length;
    
        for (let i = 0; i < loopLength; i++) {
          let entireString: string = "";
          if (includeCharacters) entireString += allLetters;
          if (includeNumbers) entireString += allNumbers;
          if (includeSymbols) entireString += allSymbols;
    
          const randomNum: number = ~~(Math.random() * entireString.length);
          result += entireString[randomNum];
        }
    
        setCoupon(result);
      };
    
      useEffect(() => {
        setIsCopied(false);
      }, [coupon]);
    
    


    return (
        <div className="adminContainer" >
        <AdminSidebar />
    <main className="dashboard-app-container" >
        <h1>Coupon</h1>
        <section>
            <form onSubmit={submitHandler} className='coupon-form'>
                <input type="text" value={prefix}  placeholder='Text to include' onChange={(e)=>setPrefix((e.target as HTMLInputElement).value)} />
                <input type="number" value={size}  placeholder='Coupon lenght' onChange={(e)=>setSize(Number((e.target as HTMLInputElement).value))}  min={8} max={25} />
                <fieldset>
                    <legend>include</legend>
                    <input type="checkbox" checked={includeNumbers}   onChange={(e)=>setIncludeNumbers(prev=>!prev)} />
                    <span>Numbers</span>
                    <input type="checkbox" checked={includeCharacters}   onChange={(e)=>setIncludeCharacters(prev=>!prev)} />
                    <span>Characters</span>
                    <input type="checkbox" checked={includeSymbols}   onChange={(e)=>setIncludeSymbols(prev=>!prev)} />
                    <span>Numbers</span>
                </fieldset>
                <button type='submit' >Generate</button>
            </form>
            {coupon&&<code>{coupon} <span onClick={()=>{copyText(coupon)}} >{isCopied?'Copied':'Copy'}</span> </code>}
        </section>
    </main>
    </div>
      )
    }
export default Coupon