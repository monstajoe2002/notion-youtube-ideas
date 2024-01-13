export type Page = {
  id: string;
  properties: {
    Name: {
      title: Array<{
        text: {
          content: string;
        };
      }>;
    };
    Flag: {
      status: {
        name: string;
        color: string;
      };
    };
    "Start Date": {
      date: {
        start: string;
      };
    };
    "Due Date": {
      date: {
        start: string;
      };
    };
    Tags: {
      multi_select: Array<{
        id: string;
        name: string;
        color: string;
      }>;
    };
  };
};
export type Block = {
  id: string;
  heading_1?: {
    rich_text: Array<{
      text: {
        content: string;
      };
      plain_text: string;
    }>;
  };
  heading_2?: {
    rich_text: Array<{
      text: {
        content: string;
      };
      plain_text: string;
    }>;
  };
  paragraph?: {
    rich_text: Array<{
      text: {
        content: string;
      };
      plain_text: string;
    }>;
  };
  divider?: Record<string, never>;
  bulleted_list_item?: {
    rich_text: Array<{
      text: {
        content: string;
      };
      plain_text: string;
    }>;
  };
  numbered_list_item?: {
    rich_text: Array<{
      text: {
        content: string;
      };
      plain_text: string;
    }>;
  };
  to_do?: {
    rich_text: Array<{
      text: {
        content: string;
      };
    }>;
    checked: boolean;
  };

  next_cursor: string;
};
