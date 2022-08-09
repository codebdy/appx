import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import intl from "react-intl-universal";
import { PageList } from "./PageList";
import { HelperList } from "./HelperList";
import { RxApp } from "packages/rx-entity-interfaces/RxApp";

export const ItemsAccordion = (props: { modules: RxApp[] }) => {
  const { modules } = props;
  return (
    <Box>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{intl.get("helper-items")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HelperList />
        </AccordionDetails>
      </Accordion>
      {modules.map((module) => {
        return (
          <Accordion key={module.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={"panel2a-header" + module.id}
            >
              <Typography>{module.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PageList module={module} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
