import React from "react"
import { Center, Grid, Spinner } from "@chakra-ui/react"
import { Channel } from "../../../types/types"
import { ChannelCard } from "./ChannelCard"
import InfiniteScroll from "react-infinite-scroll-component"
import { useScrollConstData } from "../hooks/useScrollConstData"

type ChannelCardGridProps = {
  channels: Channel[]
}

export const ChannelCardGrid = (props: ChannelCardGridProps) => {
  const { channels } = props
  const { data, currentDataLength, hasMore, loadNextData } =
    useScrollConstData(channels)

  return (
    <InfiniteScroll
      style={{ overflow: "hidden" }}
      dataLength={currentDataLength}
      hasMore={hasMore}
      loader={
        <Center>
          <Spinner thickness="4px" speed="0.65s" color="blue.500" size="lg" />
        </Center>
      }
      next={loadNextData}
    >
      <Grid templateColumns="repeat(auto-fill, minmax(12rem, 1fr))" gap={4}>
        {data.map((key) => {
          return <ChannelCard key={key.stream_id} channel={key} />
        })}
      </Grid>
    </InfiniteScroll>
  )
}
