import React from 'react';
import ReactDOM from 'react-dom';

import App from "./App"
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';


const root = document.getElementById('root');

ReactDOM.render(
  <AuthContextProvider>
    <ChatContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>,
  root
);


// const root=ReactDOM.render(<App/>,document.getElementById('root'));
// root.render(
//     <AuthContextProvider>
//         <React.StrictMode>
//             <App/>
//         </React.StrictMode>
//     </AuthContextProvider>
// )
