import React from "react"
import './locales'
import './schema'
import { DnFC } from '@designable/react'
import QueryForm from "../../ProTable/QueryForm"

export const QueryFormDesigner: DnFC<React.ComponentProps<typeof QueryForm>> = QueryForm
