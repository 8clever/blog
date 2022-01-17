import React from "react";
import Head from "next/head";
import { Thing, WithContext } from "schema-dts";

interface IProps<T extends Thing> {
  thing: WithContext<T>
}

export function StructuredData<T extends Thing> (props: IProps<T>) {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(props.thing)
      }} />
    </Head>    
  )
}