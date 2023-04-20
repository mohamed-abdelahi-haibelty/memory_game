import "./Header.css"
import Logo from "../../components/Logo/Logo"
import MainButton from "../../components/Buttons/Buttons"
import Popup from "../../components/Popup/Popup"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Header(props) {

  const navigate = useNavigate()
  const [showMenu, SetShowMenu] = useState(false);
  const setBody = props.bodyBg
  const menuData = [
    {onClick : handelRestart, class_selector: 'button-orange', text: "Restart" },
    {onClick : handelNewGame, class_selector: 'button-very-light',text: "New Game"},
    {onClick : () => SetShowMenu(false), class_selector: 'button-very-light',text: "Resume Game"}
  ]

 let menuItems = menuData.map((btn, i) => {
    return <MainButton onClick={btn.onClick} 
    class_selector={btn.class_selector} text={btn.text} key={i}/>
 })

 let slicedData = menuData.slice(0, 2)
 let lgItems =  slicedData.map((btn, i) => {
          return <MainButton onClick={btn.onClick} 
          class_selector={btn.class_selector} text={btn.text} key={i}/>
        })

  function handelRestart(){
    window.location.reload();
  }

  function handelNewGame(){
    setBody('#152938')
    navigate('/')
    localStorage.removeItem('body_color');
    localStorage.removeItem('game_state');
  }

  return (
    <>
      <div className="header">
        <Logo/>
        <div className="lg-screen-btns">
              {lgItems}
        </div>
        <MainButton onClick={()=> SetShowMenu(true)} class_selector={`button-menu button-orange`} text={'Menu'}/>
      </div>
      

      {showMenu && (
        <div className="menu-popup">
          <div className="overlay"></div>
            <div className="cn">
              <Popup>
                  {menuItems}
              </Popup>
            </div>
        </div>
      )}
    </>
  )
}

export default Header