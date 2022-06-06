import React from "react"
import { Grid } from "@chakra-ui/react"
import { Channel } from "../../../types/types"
import { ChannelCard } from "./ChannelCard"

type ChannelCardGridProps = {
  channels: Channel[]
}

export const ChannelCardGrid = (props: ChannelCardGridProps) => {
  const { channels } = props

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(12rem, 1fr))" gap={4}>
      {channels.map((key) => {
        return <ChannelCard key={key.stream_id} channel={key} />
      })}
    </Grid>
  )
}
