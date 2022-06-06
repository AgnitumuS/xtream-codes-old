import React, { ChangeEvent, useState } from "react"
import {
  Tabs,
  Center,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Select,
  Spacer,
  Input,
} from "@chakra-ui/react"

import { Category, Channel } from "../../../types/types"
import { ChannelCardGrid } from "./ChannelCardGrid"

type ChannelSectionProps = {
  mainCategories: {
    [key: string]: Category[]
  }
  channels: {
    [key: string]: Channel
  }
}

export const ChannelSection = (props: ChannelSectionProps) => {
  const { mainCategories, channels } = props

  const secondaryCategoriesByIndex = (
    mainCategoryIndex: number
  ): Category[] => {
    return mainCategories[Object.keys(mainCategories)[mainCategoryIndex]]
  }

  const secondaryCategoriesByName = (mainCategory: string): Category[] => {
    return mainCategories[mainCategory]
  }

  const [selectedMainCategoryIndex, setSelectedMainCategoryIndex] = useState(0)
  const [selectedSecondaryCategory, setSelectedSecondaryCategory] = useState(
    secondaryCategoriesByIndex(0).length <= 1
      ? secondaryCategoriesByIndex(0)[0].category_name
      : "all"
  )
  const [channelSearch, setChannelSearch] = useState("")

  const handleChangeSelectedMainCategory = (index: number) => {
    setSelectedMainCategoryIndex(index)
    setSelectedSecondaryCategory(
      secondaryCategoriesByIndex(index).length <= 1
        ? secondaryCategoriesByIndex(index)[0].category_name
        : "all"
    )
  }

  const handleChangeSelectedSecondaryCategory = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSecondaryCategory(e.currentTarget.value)
  }

  const handleChangeChannelSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setChannelSearch(e.currentTarget.value)
  }

  const filterChannels = (): Channel[] => {
    const filterCategory = (
      key: string,
      categories: Category[],
      selectedCategory: string
    ): boolean => {
      if (selectedCategory === "all")
        return categories.some((c) => {
          return c.category_name === channels[key].category_name
        })

      return channels[key].category_name === selectedCategory
    }

    const filterChannel = (key: string, channelSearch: string): boolean => {
      if (channelSearch.trim().length === 0) return true

      return channels[key].name
        .toLocaleLowerCase("es")
        .includes(channelSearch.toLocaleLowerCase("es"))
    }

    return Object.keys(channels)
      .filter((key) =>
        filterCategory(
          key,
          secondaryCategoriesByIndex(selectedMainCategoryIndex),
          selectedSecondaryCategory
        )
      )
      .filter((key) => filterChannel(key, channelSearch))
      .map((key) => {
        return channels[key]
      })
  }

  return (
    <Tabs
      index={selectedMainCategoryIndex}
      onChange={handleChangeSelectedMainCategory}
      isLazy
    >
      <Center>
        <TabList>
          {Object.keys(mainCategories).map((mainCategory) => {
            return <Tab key={mainCategory}>{mainCategory}</Tab>
          })}
        </TabList>
      </Center>
      <TabPanels>
        {Object.keys(mainCategories).map((mainCategory) => {
          return (
            <TabPanel key={mainCategory}>
              <Flex>
                <Select
                  w="fit-content"
                  value={selectedSecondaryCategory}
                  onChange={handleChangeSelectedSecondaryCategory}
                  mb={5}
                >
                  {secondaryCategoriesByName(mainCategory).length > 1 ? (
                    <option key="all" value="all">
                      TODAS
                    </option>
                  ) : null}
                  {secondaryCategoriesByName(mainCategory).map((c) => {
                    return (
                      <option key={c.category_name} value={c.category_name}>
                        {c.category_name}
                      </option>
                    )
                  })}
                </Select>
                <Spacer />
                <Input
                  value={channelSearch}
                  onChange={handleChangeChannelSearch}
                  placeholder="Buscar canal"
                  w={"minmax(12rem, 1fr)"}
                />
              </Flex>
              <ChannelCardGrid channels={filterChannels()} />
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}
