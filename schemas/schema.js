// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: "author",
      type: "document",
      title: "Author",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
          validation: (Rule) => {
            return [Rule.min(3).max(10).warning("snfjn"), Rule.required()];
          },
        },
        {
          name: "authorImage",
          type: "image",
          title: "Author Image",
        },
      ],
    },
    {
      name: "blog",
      type: "document",
      title: "Blog",
      fields: [
        {
          title: "Title",
          name: "title",
          type: "string",
        },
        {
          title: "Sub Title",
          name: "subTitle",
          type: "string",
        },
        {
          title: "Cover Image",
          name: "coverImage",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Description",
            },
          ],
        },
        {
          title: "Date",
          name: "date",
          type: "datetime",
          validation: (Rule) => {
            return Rule.required();
          },
        },
        {
          title: "Content",
          name: "content",
          type: "array",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
              fields: [
                {
                  title: "Image Position",
                  name: "imagePosition",
                  type: "string",
                  options: {
                    list: [
                      { title: "Center", value: "center" },
                      { title: "Left", value: "left" },
                      { title: "Right", value: "right" },
                    ],
                    layout: "radio",
                    isHighlighted: true,
                  },
                },
                {
                  type: "text",
                  name: "alt",
                  title: "Description",
                  options: {
                    isHighlighted: true,
                  },
                },
              ],
              options: {
                hotspot: true,
              },
            },
            {
              type: "code",
              options: {
                withFilename: true,
              },
            },
          ],
        },
        {
          title: "Author",
          name: "author",
          type: "reference",
          to: [{ type: "author" }],
          validation: (Rule) => {
            return Rule.required();
          },
        },
        {
          title: "Slug",
          name: "slug",
          type: "slug",
          validation: (Rule) => {
            return Rule.required();
          },
        },
      ],
    },
  ]),
});
