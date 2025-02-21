'use client';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins, Montserrat } from 'next/font/google';
import { FaRegCopy } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import { FaCheckSquare } from 'react-icons/fa';
import styles from './page.module.css';
import { useMemo, useState, useEffect } from 'react';

const DEFAULT_MESSAGE =
  "o estagiário não para! 🤣 depois de invadir sua inbox com mensagens motivacionais, ele resolveu criar uma fábrica de 'bom dia'! 🏭 essa ferramenta é tipo um 'gerador de good vibes' - naquele padrão the news - pra você usar e abusar. quer um 'bom dia' extra? quer mandar um recado motivacional pros amigos? o estagiário resolveu pra você! use sem moderação (e depois conta pra gente o que achou 😉).";

const poppins = Poppins({
  weight: ['400'],
  subsets: ['latin'],
});

const montserrat = Montserrat({
  weight: ['600'],
  subsets: ['latin'],
});

export default function Home() {
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('/api/csrf-token')
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.token));
  }, []);

  const handleCopy = () => {
    message &&
      navigator.clipboard.writeText(message).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
  };

  const isCopyTextButtonDisabled = useMemo(() => {
    return (!message && !isCopied) || isLoading;
  }, [message, isCopied]);

  const isCopyTextButtonEnabled = useMemo(() => {
    return message.length > 0 && !isCopied && !isLoading;
  }, [message, isCopied]);

  const handleGenerateMessage = () => {
    setIsLoading(true);
    setMessage('gerando mensagem... 🤖');

    fetch('/api/generate-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className={styles.section}>
      <Image
        priority
        src="/logo.webp"
        alt="logo the news"
        width={80}
        height={80}
        className={styles.logo}
      />
      <h1 className={styles.h1}>the news inspira!</h1>
      <h2 className={cn(poppins.className, styles.h2)}>
        comece melhor o seu dia
      </h2>
      <div className={cn(poppins.className, styles.message)}>
        {message || DEFAULT_MESSAGE}
      </div>
      <div className={styles.buttons__wrapper}>
        <button
          disabled={isLoading}
          className={cn(montserrat.className, styles.button, {
            [styles['button__primary--enabled']]: !isLoading,
            [styles['button__primary--disabled']]: isLoading,
          })}
          onClick={handleGenerateMessage}
        >
          <HiSparkles size={20} />
          gerar mensagem com IA
        </button>
        <button
          disabled={isCopyTextButtonDisabled}
          onClick={handleCopy}
          className={cn(montserrat.className, styles.button, {
            [styles['button__secondary--enabled']]: isCopyTextButtonEnabled,
            [styles['button__secondary--disabled']]: isCopyTextButtonDisabled,
            [styles['button__secondary--copied']]: isCopied,
          })}
        >
          {isCopied ? (
            <>
              <FaCheckSquare size={20} />
              mensagem copiada!
            </>
          ) : (
            <>
              <FaRegCopy size={20} />
              copiar mensagem
            </>
          )}
        </button>
      </div>
      <Link
        href="https://thenewscc.beehiiv.com/subscribe"
        className={cn(poppins.className, styles.footer)}
        target="_blank"
        rel="noopener noreferrer"
      >
        inscreva-se no the news
      </Link>
    </section>
  );
}
