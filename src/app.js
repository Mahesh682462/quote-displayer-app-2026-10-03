const { useState, useEffect } = React;

const App = () => {
  const [q, setQ] = useState({ t: '', a: '' });
  const [l, setL] = useState(true);
  const [e, setE] = useState(null);
  const [r, setR] = useState(0);

  useEffect(() => {
    const fQ = async () => {
      setL(true); setE(null);
      try {
        const res = await fetch('https://type.fit/api/quotes');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        const randIdx = Math.floor(Math.random() * data.length);
        setQ({ t: data[randIdx].text, a: data[randIdx].author || 'Unknown' });
      } catch (err) { setE('Failed: ' + err.message); }
      finally { setL(false); }
    };
    fQ();
  }, [r]);

  const hNQ = () => setR(p => p + 1);

  if (l) return <p>Loading...</p>;
  if (e) return <p style={{color:'red'}}>Error: {e}</p>;
  
  return (
    <div className="quote-container">
      <h1>Quote of the Day</h1>
      <p className="quote-text">"{q.t}"</p>
      <p className="quote-author">- {q.a}</p>
      <button onClick={hNQ} className="new-quote-btn">New Quote</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));