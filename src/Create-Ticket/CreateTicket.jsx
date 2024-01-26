import './CreateTicket.css';
import { data } from './card-ticket';
import Navigation from "../Common/pages/Navigation"
import Header from '../Common/pages/Header';
import { Link } from 'react-router-dom';
import { useNavToggle } from '../CustomHook/useNavToggle';


function CreateTicket() {
  const [style, style1, style2, setToggle] = useNavToggle();

  return (
    <div className='base-container'>
      <div className={style}>
        <Navigation toggle={setToggle} />
      </div>
      <div className={style2}><Header /></div>
      <div className={style1}>
        <div className='body-container'>
          <p className='fs-1'>Choose your Product </p>
          <div className='card-container'>
            {
              data.map((i) => {
                return <div key={i.name}>
                  <Link to="/tform" className='text-decoration-none' state={{prodname:i.name}}>
                    <div className='card align-items-center justify-content-center  card-shape1 p-3 m-3' >
                      <img src={i.src} alt='img' className='w-50 h-50 rounded' />
                      <p className=' mt-2 type-text '>{i.name}</p>
                    </div>
                  </Link>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTicket