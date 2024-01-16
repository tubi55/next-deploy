import clsx from 'clsx';
import styles from './youtube.module.scss';
import { useCustomText } from '@/hooks/useText';
import Link from 'next/link';
import Image from 'next/image';

async function fetchYoutube() {
	const api_key = 'AIzaSyDC60bIIkAJFzy7ji4a0Eo3AX6tYudhe1w';
	//const pid = process.env.REACT_APP_YOUTUBE_LIST;
	const pid = 'PLYOPkdUKSFgWqafuDQN9di3uLJoTV3L3W';
	const num = 10;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	const data = await fetch(baseURL);
	const resultData = await data.json();
	return resultData;
}

export default async function Youtube() {
	const shortenText = useCustomText('shorten');
	const customText = useCustomText('combined');
	const data = await fetchYoutube();
	console.log(data);
	return (
		<section className={clsx(styles.youtube)}>
			<h1>Youtube</h1>
			{data.items.map(data => {
				const [date, time] = data.snippet.publishedAt.split('T');

				return (
					<article key={data.id}>
						<h2>{shortenText(data.snippet.title, 50)}</h2>

						<div className='txt'>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className='pic'>
							<Link href={`/detail/${data.id}`}>{/* <Image src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} /> */}</Link>
						</div>
					</article>
				);
			})}
		</section>
	);
}
