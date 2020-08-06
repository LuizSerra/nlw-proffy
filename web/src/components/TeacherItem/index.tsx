import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
                    <header>
                        <img src="https://avatars0.githubusercontent.com/u/31904963?s=460&u=dddc6c1b0dfbf9d6d8d29346e7b9ded89b48f71e&v=4" alt="avatar" />
                        <div>
                            <strong>Luiz Serra</strong>
                            <span>Programação avançada</span>
                        </div>
                    </header>
                    <p>
                        Entusiasta por modificar o mundo através dos códigos.
                        <br />
                        Aficcionado por códigos Mudando o mundo ao redor, um deploy de cada vez.
                    </p>
                    <footer>
                        <p>
                            Preço/hora
                                    <strong>R$80,00</strong>
                        </p>
                        <button type="submit">
                            <img src={whatsappIcon} alt="whatsapp" />
                            Entrar em contato
                        </button>
                    </footer>

                </article>
    );
}
export default TeacherItem;