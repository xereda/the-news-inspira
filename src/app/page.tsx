'use client';

import cn from 'classnames';
import Image from 'next/image';
import { Poppins, Montserrat } from 'next/font/google';
import { FaRegCopy } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import { FaCheckSquare } from 'react-icons/fa';
import styles from './page.module.css';
import { useState } from 'react';

const poppins = Poppins({
  weight: ['400'],
  subsets: ['latin'],
});

const montserrat = Montserrat({
  weight: ['600'],
  subsets: ['latin'],
});

export default function Home() {
  const [message, setMessage] = useState(
    "o estagiário não para! 🤣 depois de invadir sua inbox com mensagens motivacionais, ele resolveu criar uma fábrica de 'bom dia'! 🏭 essa ferramenta é tipo um 'gerador de good vibes' - naquele padrão the news - pra você usar e abusar. quer um 'bom dia' extra? quer mandar um recado motivacional pros amigos? o estagiário resolveu pra você! use sem moderação (e depois conta pra gente o que achou 😉).",
  );
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <section className={styles.section}>
      <Image
        src="/logo.avif"
        alt="logo the news"
        width={80}
        height={80}
        className={styles.logo}
      />
      <h1 className={styles.h1}>the news inspira!</h1>
      <h2 className={cn(poppins.className, styles.h2)}>
        comece melhor o seu dia
      </h2>
      <div className={cn(poppins.className, styles.message)}>{message}</div>
      <button
        className={cn([
          montserrat.className,
          styles.button,
          styles.button__primary,
        ])}
      >
        <HiSparkles size={20} />
        gerar mensagem com IA
      </button>
      <button
        onClick={handleCopy}
        className={cn(montserrat.className, styles.button, {
          [styles.button__secondary]: !isCopied,
          [styles['button__secondary--copied']]: isCopied,
        })}
      >
        {isCopied ? (
          <>
            <FaCheckSquare size={20} />
            copiado!
          </>
        ) : (
          <>
            <FaRegCopy size={20} />
            copiar mensagem
          </>
        )}
      </button>
    </section>
  );
}
